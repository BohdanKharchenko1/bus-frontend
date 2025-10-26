import { useEffect } from "react";
import {allRoutes} from "../../api/bus";

const HomeTable = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allRoutes();
                console.log("Routes data:", response.data);
            } catch (error) {
                console.error("Error fetching routes:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Home Table</h1>
            <p>Fetching route data...</p>
        </div>
    );
};
export default HomeTable;

