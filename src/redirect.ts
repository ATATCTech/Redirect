export const excludeParams = (href: string): string => {
    return href.substring(0, href.indexOf("?"));
};

export const generateUrl = (href: string, params?: {[key: string]: string}): string => {
    if (href.startsWith(":")) href = excludeParams(window.location.href) + href.substring(1);
    params = params == null ? {} : params;
    href += "?";
    for (let i in params) {
        if (params[i] == null || params[i] === "") continue;
        if (!href.endsWith("?")) href += "&";
        href += i + "=" + params[i];
    }
    if (href.endsWith("?")) href = href.substring(0, href.length - 1);
    return href;
};

const RedirectFunction = (url?: string, args: {params?: {[key: string]: string}, blank?: boolean, refresh?: boolean} = {}): void => {
    /**
     * This function can only be called after rendered.
     * @param url: redirect to this url
     * @param config: params, blank, refresh
     * @type {string, {}}
     */
    if (url == null) {
        window.location.reload();
        return;
    }
    const params = args.params, blank = args.blank == null ? false : args.blank, refresh = args.refresh == null ? true : args.refresh;
    url = generateUrl(url, params);
    if (blank) window.open(url);
    else {
        if (refresh) window.location.href = url;
        else window.history.pushState("", "", url);
    }
};

export const useRedirect = (): (url?: string, args?: {params?: {[key: string]: string}, blank?: boolean, refresh?: boolean}) => void => {
    return RedirectFunction;
};
