"use client";

import React from "react";
import SectionHeading from "@/app/components/section-heading";
import {motion} from "framer-motion";
import {useSectionInView} from "@/app/lib/useInView";
import toast from "react-hot-toast";
import {sendEmail} from "@/app/actions/sendEmail";
import SubmitBtn from "@/app/components/submit";

export default function Contact() {
    const {ref} = useSectionInView("#contact", 0.1);
    return (
        <motion.section
            id="contact"
            ref={ref}
            className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            transition={{
                duration: 1,
            }}
            viewport={{
                once: true,
            }}
        >
            <SectionHeading>Contact me</SectionHeading>

            <p className="text-gray-700 -mt-6 dark:text-white/80">
                Please contact me directly at{" "}
                <a className="underline" href="">
                    soeren48@hotmail.com
                </a>{" "}
                or through this form.
            </p>

            <form
                className="mt-10 flex flex-col dark:text-black"
                action={async (formData) => {
                    const {error} = await sendEmail(formData);

                    if (error) {
                        toast.error(error);
                        return;
                    }

                    toast.success("Email sent successfully!");
                }}
            >
                <input
                    className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
                    name="senderEmail"
                    type="email"
                    required
                    maxLength={500}
                    placeholder="Your email"
                />
                <textarea
                    className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
                    name="message"
                    placeholder="Your message"
                    required
                    maxLength={5000}
                />
                <SubmitBtn/>
            </form>
        </motion.section>
    )
}
