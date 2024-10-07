import { PriceTag } from "@/components/PriceTag";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export function SimilarJobCard() {
  return (
    <Card className="p-3 border-none">
      <div className="flex justify-between items-center gap-x-3">
        <div className="flex items-center gap-x-3">
          <div className="aspect-square w-12 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/svgs/demo-logo.svg"
              alt="demo logo"
              width={150}
              height={150}
            />
          </div>
          <div>
            <CardTitle className="text-white text-base">
              Product Designer
            </CardTitle>
            <CardDescription className="text-placeholder text-sm">
              WorkOS
            </CardDescription>
          </div>
        </div>
        <PriceTag price={1200} />
      </div>
    </Card>
  );
}
