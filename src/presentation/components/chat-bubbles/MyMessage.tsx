interface Props {
  text: string;
}
export const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 rounded-full flex-shrink-0">
          F
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
