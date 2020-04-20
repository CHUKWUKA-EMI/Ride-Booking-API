import userResolver from "./Users";
import routesResolver from "./Routes";
import bookingResolver from "./Bookings";

const resolver = {
	...userResolver,
	...routesResolver,
	...bookingResolver,
};

export default resolver;
