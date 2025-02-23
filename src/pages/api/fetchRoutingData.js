import { getAllUrls } from "@/actions/url-operations";

export default async function handler(req, res) {
    const allUrls = await getAllUrls();
    res.status(200).json(allUrls);
}