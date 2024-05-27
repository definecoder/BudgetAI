
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { DataTableDemo } from "./myTable";



export default function Page() {
    return (
        <main>
            {/* main wrapper */}
            <div className="flex border-2 h-[80vh] justify-around">
                {/* left wrapper */}
                <div className="border-2 border-red-600 flex flex-col justify-center h-full">
                    {/* upper */}
                    <div className="border-2 flex flex-col">
                        <Label className="text-primary mb-5 text-3xl">Your Expense</Label>
                        <Textarea className="bg-transparent border-secondary" placeholder="What did you spend money on today?" />
                        <Button className=" bg-transparent mt-5 border-secondary border-2 w-[30%] self-end">Submit</Button>
                    </div>

                    {/* lower */}
                    <div className="border-2">
                        Analytics
                    </div>
                </div>
                {/* right wrapper */}
                <div className="border-2">
                    right container
                    <DataTableDemo />
                
                </div>
            </div>
        </main>

    );
    
}

