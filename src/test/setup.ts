import "@testing-library/jest-dom/vitest";

// Stub scrollIntoView since jsdom does not implement it but Radix portals call it.
if (!Element.prototype.scrollIntoView) {
	Element.prototype.scrollIntoView = () => {};
}
