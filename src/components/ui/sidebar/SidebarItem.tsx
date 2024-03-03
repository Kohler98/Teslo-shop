import Link from "next/link";

interface Props {
  icon: React.ReactNode;
  href?: string;
  title: string;
  onClick?: () => void
}

export const SidebarItem: React.FC<Props> = ({ icon, href = "/", title,onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
    >
        {icon}
      <span className="ml-3 text-xl">{title}</span>
    </Link>
  );
};
