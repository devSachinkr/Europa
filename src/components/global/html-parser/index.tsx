import React from "react";
import parse from "html-react-parser";
type Props = {
  html: string;
};

const HtmlParser = ({ html }: Props) => {
  // use Effect to check if the component is mounted and avoid Hydration errors
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(true);
  }, []);
  return (
    <div className="[&_h1]:text-4xl [&_h2]:text-3xl [&_blockqoute]:italic [&_iframe]:aspect-video [&_h3]:text-2xl text-themeTextGray flex flex-col gap-y-3">
      {mounted && parse(html)}
    </div>
  );
};

export default HtmlParser;
