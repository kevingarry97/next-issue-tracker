"use client";

import React, { useState } from "react";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import dynamic  from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false})

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({issue}: {issue?: Issue}) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment…" {...field} />
          )}
        />
        <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        <Button disabled={submitting}>
          Submit New Issue {submitting && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
