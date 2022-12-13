type Props = {
  children: React.ReactNode;
};

export const HStack = ({ children }: Props) => {
  return (
    <div className="flex justify-between gap-10 items-center">{children}</div>
  );
};
