export const UserInfoPage = () => {
  return (
    <>
      <div className="flex h-screen flex-col justify-center items-center">
        <div className="text-main_color text-3xl">
          <div className=" pb-7 font-bold">caloreat</div>
        </div>

        <div className="flex flex-col">
          <input
            className="border bg-white my-2 focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color text-sm pl-2 pr-11 py-3"
            type="date"
          />
        </div>
      </div>
    </>
  );
};
