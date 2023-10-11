interface SectionHeadingProps {
  title: string
}

const SectionHeading = ({ title }: SectionHeadingProps) => {
  return <h3 className="text-2xl font-bold">{title}</h3>
}

export default SectionHeading
