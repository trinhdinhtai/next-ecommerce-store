interface SectionHeadingProps {
  title: string;
}

const SectionHeading = ({ title }: SectionHeadingProps) => {
  return <h3 className="font-bold text-3xl px-4 sm:px-6 lg:px-8">{title}</h3>;
};

export default SectionHeading;
