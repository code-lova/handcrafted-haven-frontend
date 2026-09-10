"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { Mail, Clock } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import PageHeader from "../core/PageHeader";
import LoaderButtons from "../core/loaders/LoaderButtons";
import { contactSchema } from "@/schema/contact";
import { ContactFormValues } from "@/types";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactPage = () => {
  const handleSubmit = (
    values: ContactFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    toast.success("Thanks for reaching out! We'll get back to you soon.");
    resetForm();
  };

  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Get in Touch"
        title="We'd love to hear from you"
        description="Questions about an order, becoming a seller, or just want to say hello? Send us a message."
      />

      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={contactSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-5">
                  <label htmlFor="name">Your Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="email">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="subject">Subject</label>
                  <Field
                    name="subject"
                    as="select"
                    id="subject"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="order-support">Order Support</option>
                    <option value="become-a-seller">Becoming a Seller</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="message">Message</label>
                  <Field
                    as="textarea"
                    name="message"
                    id="message"
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-olive resize-none"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <LoaderButtons loading={false} text="Send Message" type="submit" />
              </Form>
            )}
          </Formik>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-olive/10 text-olive shrink-0">
              <Mail size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-rich-brown">Email us</h3>
              <p className="text-muted text-sm mt-1">hello@handcraftedhaven.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-olive/10 text-olive shrink-0">
              <Clock size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-rich-brown">Response time</h3>
              <p className="text-muted text-sm mt-1">
                We typically reply within 1-2 business days.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-olive/5 p-6">
            <p className="text-sm text-muted">
              Already have an order? Sign in and check your{" "}
              <span className="text-olive font-medium">Buyer Dashboard</span>{" "}
              for the fastest updates.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
