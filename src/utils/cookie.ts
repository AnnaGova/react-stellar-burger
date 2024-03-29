interface ICookieProps {
  path?: string;
  expires?: number | Date | string;
  [key: string]: string | number | Date | undefined;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
      "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string,
  props: ICookieProps = {}
): void {
  props = {
    path: "/",
    ...props,
  };

  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== undefined) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export const deleteCookie = (name: string): void => {
  setCookie(name, "", { expires: -1 });
};
