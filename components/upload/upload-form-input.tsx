"use client"

import { Button } from '../ui/button';
import { Loader2, Upload } from 'lucide-react';
import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from '../ui/input';


type Props = {
  loading: boolean;
  onSubmit: (file: File) => void;
};

const UploadFormInput = ({loading, onSubmit}:Props) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File | null;

    if (!file) return;

    onSubmit(file);
    (e.target as HTMLFormElement).reset();
  };


    return (
        <>
            <div className="flex justify-center items-start min-h-screen">
                <Card className="w-full max-w-lg shadow-lg">
                    <CardHeader>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Select PDF file
                                </label>
                                <Input
                                    type="file"
                                    name="file"
                                    accept="application/pdf"
                                    required
                                />
                            </div>

                            {/* Submit button */}
                            <Button
                                type="submit"
                                className="w-full flex items-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Uploading & Processing...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="h-4 w-4" />
                                        Upload PDF
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )

}

export default UploadFormInput