import userResolver from "./Users";
import routesResolver from "./Routes";

const resolver = {
	...userResolver,
	...routesResolver,
};

export default resolver;
