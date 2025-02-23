"use client";
import { createUrl } from '@/actions/url-operations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { set } from 'mongoose';
import { redirect } from 'next/navigation';
import React from 'react'
import { useState } from 'react'

const AddNewRedirect = () => {
    const [originalURL, setOriginalURL] = useState('');
    const [redirectURL, setRedirectURL] = useState('');
    const [redirectType, setRedirectType] = useState('301');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createUrl(originalURL, redirectURL, redirectType);
        console.log(result);
        redirect("/admin-panel/url-manager")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <Label htmlFor="orignalURL">URL</Label>
                    <Input id="orignalURL" type="text" placeholder="/your-url" required onChange={(e) => setOriginalURL(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="redirectURL">Redirect URL</Label>
                    <Input id="redirectURL" type="text" placeholder="/your-new-url" required onChange={(e) => setRedirectURL(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="redirectType">Redirect Type</Label>
                    <Input id="redirectType" type="text" placeholder="301" required onChange={(e) => setRedirectType(e.target.value)} />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default AddNewRedirect