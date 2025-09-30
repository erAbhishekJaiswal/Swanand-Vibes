const TruncateText = ({ text, limit }) => {
  return (
    <p>
      {text.length > limit ? text.substring(0, limit) + "..." : text}
    </p>
  );
};

export default TruncateText;