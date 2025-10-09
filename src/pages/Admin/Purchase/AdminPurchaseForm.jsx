import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../CssFiles/Admin/Purchase/AdminPurchaseForm.css"; // <- You will define styles here

function formatCurrency(num) {
  return Number(num).toFixed(2);
}

const emptyLine = () => ({
  productId: "",
  productName: "",
  variants: [],
  variantIndex: null,
  quantity: 1,
  purchasePrice: 0,
  tax: 0,
});

export default function AdminPurchaseForm() {
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [lines, setLines] = useState([emptyLine()]);
  const [searchQuery, setSearchQuery] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [invoiceFiles, setInvoiceFiles] = useState([]);
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/vendor/`)
      .then((res) => setVendors(res.data.data || res.data))
      .catch((error) => {
        // console.log('Error fetching vendors');
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) return;
    const controller = new AbortController();
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/products/search?search=${encodeURIComponent(searchQuery)}`,
        { signal: controller.signal }
      )
      .then((res) => {
        console.log(res.data.data);
        setProductResults(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        console.log("Error fetching products");
      });
    return () => controller.abort();
  }, [searchQuery]);

  function addLine() {
    console.log((prev) => [...prev, emptyLine()]);

    setLines((prev) => [...prev, emptyLine()]);
  }

  function removeLine(idx) {
    setLines((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateLine(idx, patch) {
    console.log(patch);
    setLines((prev) =>
      prev.map((l, i) => (i === idx ? { ...l, ...patch } : l))
    );
  }

  // function onPickProduct(idx, product) {
  //   console.log(product);
  //   updateLine(idx, {
  //     productId: product.id,
  //     productName: product.name,
  //     variants: product.variants, // renamed from variantSize
  //     variantIndex: null,
  //     quantity: 1,
  //     purchasePrice: 0,
  //     tax: 0,
  //   });

  //   setProductResults([]);
  //   setSearchQuery("");
  // }

  function onPickProduct(idx, product) {
    const productTax = product.tax || 0; // <- Auto-pick tax

    updateLine(idx, {
      productId: product._id,
      productName: product.name,
      variants: product.variants || [],
      variantIndex: null,
      quantity: 1,
      purchasePrice: 0,
      tax: productTax, // <- Set tax from product
    });

    setProductResults([]);
    setSearchQuery("");
  }

  // function computeTotals() {
  //   let subTotal = 0,
  //     totalTax = 0,
  //     totalQty = 0;
  //   for (const ln of lines) {
  //     const q = Number(ln.quantity || 0);
  //     const p = Number(ln.purchasePrice || 0);
  //     const t = Number(ln.tax || 0);
  //     subTotal += q * p;
  //     totalTax += Number(t || 0);
  //     totalQty += q;
  //   }
  //   return { subTotal, totalTax, grandTotal: subTotal + totalTax, totalQty };
  // }

  function computeTotals() {
    let subTotal = 0,
      totalTax = 0,
      totalQty = 0;
    for (const ln of lines) {
      const q = Number(ln.quantity || 0);
      const p = Number(ln.purchasePrice || 0);
      const taxPercent = Number(ln.tax || 0);

      const itemSubtotal = q * p;
      const taxAmount = itemSubtotal * (taxPercent / 100);

      subTotal += itemSubtotal;
      totalTax += taxAmount;
      totalQty += q;
    }
    return { subTotal, totalTax, grandTotal: subTotal + totalTax, totalQty };
  }

  // async function handleFileChange(e) {
  //   const files = Array.from(e.target.files);
  //   setInvoiceFiles(files);
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    if (!vendorId) {
      setErrors("Select a vendor");
      setLoading(false);
      return;
    }
    // validate lines first
    const validItems = lines.filter(
      (l) => l.productId && Number(l.quantity) > 0
    );
    console.log(validItems);

    if (validItems.length === 0) {
      setErrors("Add at least one valid product line");
      setLoading(false);
      return;
    }

    const useFormData = invoiceFiles.length > 0;
    try {
      if (useFormData) {
        const fd = new FormData();
        const payload = {
          vendorId,
          items: validItems.map((l) => ({
            productId: l.productId,
            variantIndex: l.variantIndex !== null ? l.variantIndex : undefined,
            variantSize: l.variantSize || undefined,
            quantity: Number(l.quantity),
            purchasePrice: Number(l.purchasePrice),
            tax: Number(l.tax || 0),
          })),
          paymentMethod,
          notes,
        };
        fd.append("payload", JSON.stringify(payload));

        invoiceFiles.forEach((f) => fd.append("invoiceFiles", f));
        console.log(fd);
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/purchase/`,
          fd,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert(
          "Purchase created: " + (res.data.purchase?.invoiceNumber || "OK")
        );
      } else {
        const body = {
          vendorId,
          items: validItems.map((l) => ({
            productId: l.productId,
            variantIndex: l.variantIndex !== null ? l.variantIndex : undefined,
            variantSize: l.variantSize || undefined,
            quantity: Number(l.quantity),
            purchasePrice: Number(l.purchasePrice),
            tax: Number(l.tax || 0),
          })),
          paymentMethod,
          notes,
          invoiceFiles: [],
        };
        console.log(body);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/purchase/`,
          body
        );
        alert(
          "Purchase created: " + (res.data.purchase?.invoiceNumber || "OK")
        );
      }

      setLines([emptyLine()]);
      setInvoiceFiles([]);
      setNotes("");
      setVendorId("");
    } catch (err) {
      console.error(err);
      setErrors(err.response?.data?.message || "Failed to create purchase");
    } finally {
      setLoading(false);
    }
  }

  const totals = computeTotals();

  return (
    <div className="admin-purchase-form">
      <h2>Create Purchase / Invoice</h2>
      {errors && <div className="form-error">{errors}</div>}
      <form onSubmit={handleSubmit}>
        <div className="admin-purchase-form-group">
          <label>Vendor</label>
          <br />
          <select
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
          >
            <option value="">-- select vendor --</option>
            {vendors.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-purchase-form-group">
          <label>Search product</label>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product by name or SKU"
          />
          {productResults.length > 0 && (
            <div className="product-search-results">
              {productResults?.map((p) => (
                <div
                  key={p._id}
                  className="product-result-item"
                  onClick={() => onPickProduct(lines.length - 1, p)}
                >
                  <strong>{p.name}</strong>
                  <br />
                  <small>
                    Brand: {p.brand} | Category:{" "}
                    {p.category?.name || p.category}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-purchase-form-group">
          <h4>Items</h4>
          {lines?.map((ln, idx) => (
            <div key={idx} className="line-item">
              <div className="line-item-row">
                <div className="field product-name">
                  <label>Product</label>
                  <input
                    value={ln.productName}
                    readOnly
                    placeholder="Pick product"
                  />
                </div>
                <div className="field variant-size">
                  <label>Variant / Size</label>

                  {ln.variants && (
                    // <select
                    //  value={ln.variantIndex ?? ""}
                    //    onChange={(e) =>
                    //     updateLine(idx, {
                    //     variantIndex: Number(e.target.value),
                    //     })
                    //   }
                    // >
                    //   <option value="">-- select variant --</option>
                    //   {ln.variants.map((v, i) => (
                    //     <option key={i} value={i}>
                    //       {v.size}
                    //     </option>
                    //   ))}
                    // </select>
                    <select
                      value={ln.variantIndex ?? ""}
                      onChange={(e) => {
                        const variantIndex = Number(e.target.value);
                        const variantSize =
                          ln.variants && ln.variants[variantIndex]
                            ? ln.variants[variantIndex].size
                            : "";

                        updateLine(idx, {
                          variantIndex,
                          variantSize, // <- Add this!
                        });
                      }}
                    >
                      <option value="">-- select variant --</option>
                      {ln.variants.map((v, i) => (
                        <option key={i} value={i}>
                          {v.size}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* <input value={ln.variantSize} onChange={e => updateLine(idx, { variantSize: e.target.value })} /> */}
                </div>
                <div className="field qty">
                  <label>Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={ln.quantity}
                    onChange={(e) =>
                      updateLine(idx, { quantity: e.target.value })
                    }
                  />
                </div>
                <div className="field price">
                  <label>Purchase Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={ln.purchasePrice}
                    onChange={(e) =>
                      updateLine(idx, { purchasePrice: e.target.value })
                    }
                  />
                </div>
                {/* <div className="field tax">
                  <label>Tax</label>
                  <input
                    type="number"
                    value={ln.tax}
                    onChange={(e) => updateLine(idx, { tax: e.target.value })}
                  />
                </div> */}
                <div className="field tax">
                  <label>Tax (%)</label>
                  <input
                    type="number"
                    value={ln.tax}
                    onChange={(e) => updateLine(idx, { tax: e.target.value })}
                    placeholder="Tax %"
                    readOnly
                  />
                </div>

                <div className="field total">
                  <label>Total</label>
                  {/* <div className="line-total">
                    {formatCurrency(ln.quantity * ln.purchasePrice) + ln.tax}
                  </div> */}
                  {/* <div className="line-total">
                    ₹
                    {formatCurrency(
                      Number(ln.quantity) * Number(ln.purchasePrice) +
                        Number(ln.tax)
                    )}
                  </div> */}
                  <div className="line-total">
                    ₹
                    {formatCurrency(
                      Number(ln.quantity) * Number(ln.purchasePrice) +
                        (Number(ln.quantity) *
                          Number(ln.purchasePrice) *
                          Number(ln.tax)) /
                          100
                    )}
                  </div>
                </div>
                <div className="field remove">
                  <label>&nbsp;</label>
                  <button
                    type="button"
                    onClick={() => removeLine(idx)}
                    disabled={lines.length === 1}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="form-group">
            <button type="button" onClick={addLine}>
              + Add item
            </button>
          </div>
        </div>

        {/* <div className="admin-purchase-form-group">
          <label>Invoice files (optional)</label>
          <br />
          <input type="file" multiple onChange={handleFileChange} />
        </div> */}

        <div className="admin-purchase-form-group">
          <label>Payment Method</label>
          <br />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="bank">Bank Transfer</option>
            <option value="upi">UPI</option>
            <option value="credit">Credit</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div className="admin-purchase-form-group">
          <label>Notes</label>
          <br />
          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="totals">
          <div>Subtotal: ₹{formatCurrency(totals.subTotal)}</div>
          <div>Tax: ₹{formatCurrency(totals.totalTax)}</div>
          <div>
            <strong>Total: ₹{formatCurrency(totals.grandTotal)}</strong>
          </div>
          <div>Total Qty: {totals.totalQty}</div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Purchase"}
          </button>
        </div>
      </form>
    </div>
  );
}
