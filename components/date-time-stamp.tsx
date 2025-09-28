"use client";

import React from "react";

export default function DateTimeStamp({ className = "" }: { className?: string }) {
  const [now, setNow] = React.useState<string>("");

  React.useEffect(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
    setNow(formatter.format(new Date()));
  }, []);

  return <span className={className}>{now}</span>;
}
