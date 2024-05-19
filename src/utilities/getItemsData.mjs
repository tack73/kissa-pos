import axios from "axios";

export default function getItemsData() {
    axios.get("/api/menu").then(function (response) {
        return response.data;
    });
}