import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EMPLOYMENT = ["Full time", "Part time", "Contract"] as const;
const WORK_MODEL = ["Remote", "On site", "Hybrid"] as const;
const CURRENCY = ["NGN"] as const;

const jobSchema = z
  .object({
    position: z.string().min(1, "Position is required"),
    employment: z.enum(EMPLOYMENT),
    workModel: z.enum(WORK_MODEL),
    location: z.string().min(1, "Location is required"),
    salaryMin: z.number().nonnegative(),
    salaryMax: z.number().nonnegative(),
    currency: z.enum(CURRENCY),
    // TODO: use an array for the tags
    tags: z.string(),
  })
  .superRefine((args, ctx) => {
    if (args.salaryMax < args.salaryMin) {
      return ctx.addIssue({
        message: "Maximum salary must be greater than minimum salary",
        code: "custom",
        path: ["salaryMax"],
      });
    }
  });

export function PostJob({ trigger }: { trigger: ReactNode }) {
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      position: "",
      employment: "Full time",
      workModel: "On site",
      location: "",
      salaryMax: 0,
      salaryMin: 0,
      currency: "NGN",
      tags: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof jobSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger className="grow" asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className="p-0 border-divider-dark max-w-3xl pb-8"
        hasCloseIcon={false}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4">
            <DialogHeader className="p-4 space-y-[1.125rem]">
              <div className="flex items-center gap-x-3">
                <div className="relative">
                  <div className="aspect-square overflow-clip w-20 rounded-full">
                    <img
                      width={150}
                      height={150}
                      src="/images/following-demo.png"
                      alt="testing stuff"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 right-0 p-2 rounded-full bg-block-light">
                    <input type="file" className="absolute inset-0 opacity-0" />
                    <Pencil size={18} className="stroke-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl leading-none font-medium text-white">
                    Name of user
                  </h2>
                  <p className="text-lg">@username</p>
                </div>
              </div>
            </DialogHeader>
            <DialogDescription className="p-4 space-y-6">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Position</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Employment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the kind of job employment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EMPLOYMENT.map((employ) => (
                          <SelectItem value={employ} key={employ}>
                            {employ}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the kind of work model for the job" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {WORK_MODEL.map((work) => (
                          <SelectItem value={work} key={work}>
                            {work}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the currency for the salary" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCY.map((curr) => (
                          <SelectItem value={curr} key={curr}>
                            {curr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Minimum Amount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Maximum Amount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select tags for this job</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogDescription>
            <DialogFooter className="p-0 px-4 pb-4 pt-6">
              <Button className="w-full">Done</Button>
              <Button className="w-full" variant={"secondary"} type="button">
                Save to draft
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
