"use client";
import { useSectionInView } from "@/app/lib/useInView";
import SectionHeading from "@/app/components/common/SectionHeading";
import { certificiateData } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Certificates() {
  const { ref } = useSectionInView("#certificates");

  return (
    <section
      id="certificates"
      ref={ref}
      className="scroll-mt-12 sm:scroll-mt-28 mb-28 sm:mb-40"
    >
    <SectionHeading>My Certificates</SectionHeading>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {certificiateData.map((certificate) => (
            <Link  key={certificate.title} href={certificate.link}>
             <Image
                    src={certificate.imageUrl}
                    height="200"
                    width="200"
                    className="object-cover hover:scale-105"
                    alt={certificate.title}
                    loading="lazy"
                  />
                  </Link>
          ))}
        </div>
      </div>
    </section>
  );
}