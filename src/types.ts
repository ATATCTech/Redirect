export type Args = {params?: {[key: string]: string}, blank?: boolean, refresh?: boolean};
export type RedirectFunction = (url?: string, args?: Args) => void;