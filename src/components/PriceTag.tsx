export function PriceTag({ price }: { price: number }) {
	return (
		<div className="bg-green-light/[0.07] rounded-lg px-3 py-1.5">
			<p className="text-green-light text-sm">{price} $</p>
		</div>
	);
}
