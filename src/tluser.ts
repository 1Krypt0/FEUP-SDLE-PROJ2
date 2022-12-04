// SDLE @ M.EIC, 2022
// T4G14

import TLPost from "./tlpost.js";

export type TLUserHandle = string;

export default interface TLUser {
    readonly handle: TLUserHandle;
    followers: TLUserHandle[];
    following: TLUserHandle[];
    posts: Omit<TLPost, "handle">[];
}