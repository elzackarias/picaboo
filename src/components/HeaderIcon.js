export default function HeaderIcon({ Icon, active }) {
  return (
    <div className="flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 rounded-xl active:border-b-[3px] group">
      <Icon
        className={`text-2xl sm:h-7 mx-auto text-center group-hover:text-corporative ${
          active ? "text-corporative" : "text-gray-500 "
        }`}
      />
    </div>
  );
}
