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
    <div className="[&_h1]:text-4xl [&_h2]:text-3xl [&_blockquote]:text-xl [&_p]:text-lg [&_h3]:text-2xl [&_h4]:text-xl [&_ul]:text-lg [&_ol]:text-lg [&_li]:text-lg [&_a]:text-themeTextBlue [&_code]:text-sm [&_pre]:text-sm [&_strike]:text-sm [&_em]:text-sm [&_strong]:text-sm [&_s]:text-sm text-themeTextGray flex flex-col gap-y-3 ">
      {mounted && parse(html)}
    </div>
  );
};

export default HtmlParser;
