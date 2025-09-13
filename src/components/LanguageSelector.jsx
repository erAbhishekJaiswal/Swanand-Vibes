import { useTranslation } from 'react-i18next';
import "./css/Translate.css"
const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='translate-container'>
        <div className="trans-salect">
            <select className='t-select' onChange={(e) => changeLanguage(e.target.value)}>
                <option className='t-select-option' value="en">English</option>
                <option className='t-select-option' value="hi">हिन्दी</option>
                <option className='t-select-option' value="mr">मराठी</option>
            </select>
        </div>
      {/* <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('hi')}>हिन्दी</button>
      <button onClick={() => changeLanguage('mr')}>मराठी</button> */}
    </div>
  );
};

export default LanguageSelector;
