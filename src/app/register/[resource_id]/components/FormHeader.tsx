import Image from "next/image";
import { Resource } from "@/app/schema/resource";

interface FormHeaderProps {
  resource: Resource;
}

export default function FormHeader({ resource }: FormHeaderProps) {
  return (
    <div className="flex flex-col text-center justify-center flex-shrink-0">
      <div className="flex items-center justify-center mb-2">
        <Image
          src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//HDC-2-mda-logo-05.png"
          alt="Hablemos de cancer"
          width={150}
          height={150}
          className="object-contain"
          priority
        />
      </div>
      <div>
        <h1 className="text-2xl xs:text-4xl font-semibold text-gray-800 mb-2">
          {resource?.name}
        </h1>
      </div>
    </div>
  );
}
