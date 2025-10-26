import {baseUrl} from "../lib/axios";

export const allRoutes = async () => {
    return await baseUrl.post('/get_routes.php',
        {
            id_from: "3",
            id_to: "6",
            date: "2025-10-28",
            trans: "bus",
            search_type: 1,
            change: "auto",
            currency: "EUR",
            lang: "en",
            v: "1.1"
        })
}
