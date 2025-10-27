import {useEffect, useState} from "react";
import {allRoutes} from "../../api/bus";

const HomeTable = () => {
    const [data, SetData] = useState<unknown>('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allRoutes();
                SetData(response)
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
            {String(data)}
        </div>
    );
};
export default HomeTable;

