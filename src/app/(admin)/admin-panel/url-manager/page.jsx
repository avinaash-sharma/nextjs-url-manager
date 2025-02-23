"use client";
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CirclePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllUrls } from '@/actions/url-operations'
import { redirect } from 'next/navigation';

const URLManager = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const result = await getAllUrls();
            console.log("🚀 ~ fetchData ~ result:", result)
            localStorage.setItem('redirects', JSON.stringify(result));
            setData(result);

        } catch (error) {
            console.log("🚀 ~ fetchData ~ error:", error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <div className="flex justify-end">
                <Button onClick={() => { redirect("/admin-panel/url-manager/add") }}>
                    <CirclePlus /> Add new URL
                </Button>
            </div>
            <Table>
                <TableCaption>List of all URLs.</TableCaption>
                <TableHeader>
                    <TableRow>

                        <TableHead className="font-bold">URL</TableHead>
                        <TableHead className="font-bold">New Redirect URL</TableHead>
                        <TableHead className="font-bold">Redirect Type</TableHead>
                        <TableHead className="font-bold">Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data ? (

                        data?.map((item) => (
                            <TableRow key={item._id}>

                                <TableCell>{item.originalURL}</TableCell>
                                <TableCell>{item.redirectURL}</TableCell>
                                <TableCell>{item.redirectType}</TableCell>
                                <TableCell>{Date(item.createdAt)}</TableCell>
                            </TableRow>))

                    ) : 'No Data Found'}
                </TableBody>
            </Table>

        </div>
    )
}

export default URLManager