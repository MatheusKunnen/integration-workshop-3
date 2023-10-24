import basicInfo from "./basicInfo.js"
import components from "./components.js";
import servers from "./servers.js";
import tags from "./tags.js";
import paths from "./paths.js";

export default {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...paths
};