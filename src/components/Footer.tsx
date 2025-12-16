import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="h-6 w-6 text-primary-glow" />
            <span className="font-semibold text-lg">Nesilden Nesile Yeşil Geleceğe</span>
          </div>
          <div />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
