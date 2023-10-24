import children from "./children/index.js";
import passwordGroups from "./passwordGroups/index.js";
import snacks from "./snacks/index.js";
import parents from "./parents/index.js";

export default {
    paths:{
        ...snacks,
        ...passwordGroups,
        ...children,
        ...parents,
    }
};