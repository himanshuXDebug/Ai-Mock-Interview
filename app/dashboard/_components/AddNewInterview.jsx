"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, SetJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const sanitizeJSON = (text) => {
        // Remove code block markers and get just the JSON content
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            return jsonMatch[1].trim();
        }
        return text.trim();
    };

    const validateAndParseJSON = (jsonString) => {
        try {
            // Ensure the JSON is properly formatted
            const cleaned = jsonString.replace(/\n\s*/g, ' ').trim();
            return JSON.parse(cleaned);
        } catch (error) {
            console.error("JSON parsing error:", error);
            return null;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("Submitting form with:", { jobPosition, jobDesc, jobExperience });

            const InputPrompt = `Create a JSON array of 5 Mock interview questions and answers for a ${jobPosition} position with ${jobExperience} years of experience. Required skills: ${jobDesc}. Format: [{"question": "Q1", "answer": "A1"}, ...]. Return ONLY valid JSON.`;

            const result = await chatSession.sendMessage(InputPrompt);
            const response = await result.response.text();
            
            console.log("Raw AI response:", response);

            // Clean and parse the JSON
            const cleanedJSON = sanitizeJSON(response);
            console.log("Cleaned JSON:", cleanedJSON);

            const parsedData = validateAndParseJSON(cleanedJSON);
            
            if (!parsedData) {
                throw new Error("Failed to parse AI response into valid JSON");
            }

            console.log("Parsed data:", parsedData);

            // Create the mock interview record
            const mockId = uuidv4();
            const dbPayload = {
                mockId,
                jsonMockResp: JSON.stringify(parsedData), // Store the cleaned, validated JSON
                jobPosition,
                jobDesc,
                jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            };

            console.log("Inserting into DB:", dbPayload);

            const resp = await db.insert(MockInterview)
                .values(dbPayload)
                .returning({ mockId: MockInterview.mockId });

            console.log("DB Response:", resp);

            if (resp?.[0]?.mockId) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0].mockId);
            } else {
                throw new Error("Failed to create interview record");
            }

        } catch (error) {
            console.error("Error in submission:", error);
            // You might want to show an error message to the user here
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-bold text-lg">+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Tell us more about the job you are Interviewing
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div>
                                <form onSubmit={onSubmit}>
                                    <div>
                                        <p>
                                            Add details about your Job Position/role, Job Description,
                                            and Years of Experience.
                                        </p>
                                        <div className="mt-7 my-3">
                                            <label>Job Role/Job Position</label>
                                            <Input
                                                placeholder="Ex. Full stack Developer"
                                                required
                                                onChange={(event) => setJobPosition(event.target.value)}
                                            />
                                        </div>
                                        <div className="my-3">
                                            <label>Job Description / Tech Stack (in short)</label>
                                            <Input
                                                placeholder="Ex. React, Angular, NodeJs"
                                                required
                                                onChange={(event) => SetJobDesc(event.target.value)}
                                            />
                                        </div>
                                        <div className="my-5">
                                            <label>Years Of Experience</label>
                                            <Input
                                                placeholder="Ex. 5"
                                                type="number"
                                                max="60"
                                                required
                                                onChange={(event) => setJobExperience(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-5">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setOpenDialog(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading ?
                                                <>
                                                    <LoaderCircle className="animate-spin" /> Generating from AI
                                                </> : 'Start Interview'
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;