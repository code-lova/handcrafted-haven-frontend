"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { createComment, getStoryComments } from "@/service/request/comment";
import { CommentProps } from "@/service/request/comment/type";
import toast from "react-hot-toast";
import { createCommentSchema } from "@/schema/comment";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { CommentSkeleton } from "../core/skeleton";

type Props = {
  storyId: string;
};

const CommentSection = ({ storyId }: Props) => {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const user = session?.user?.id;

  const { data: comments, isLoading } = useQuery<CommentProps[]>({
    queryKey: ["comments", storyId],
    queryFn: () => getStoryComments(storyId!),
    enabled: !!storyId,
  });

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      toast.success("Comment added!");
      queryClient.invalidateQueries({ queryKey: ["comments", storyId] });
      formik.resetForm();
    },
    onError: (err) => {
      toast.error(err.message || "Error submitting comment");
    },
  });

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: createCommentSchema,
    onSubmit: async (values) => {
      await createCommentSchema.validate(values);
      if (!storyId || !user) return;
      mutation.mutate({
        storyId,
        userId: user,
        content: values.content,
      });
    },
  });


  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="text-olive" size={22} />
        Comments
      </h2>

      {/* All Comments */}
      <div className="space-y-4 mb-8">
        {isLoading && <CommentSkeleton />}
        {comments?.length === 0 && (
          <p className="text-gray-500 italic">No comments yet. Be the first!</p>
        )}
        {comments?.map((comment) => (
          <div
            key={comment?._id}
            className="flex items-start gap-4 bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="w-10 h-10 bg-olive text-white rounded-full flex items-center justify-center font-semibold">
              {comment?.userId?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-olive">
                  {comment?.userId?.name || "User"}
                </p>
                <span className="text-xs text-gray-500">
                  {comment?.createdAt
                    ? formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })
                    : ""}
                </span>
              </div>
              <p className="text-gray-800 mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      {user && status === "authenticated" ? (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <textarea
            name="content"
            rows={3}
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Leave your comment..."
            value={formik.values.content}
            onChange={formik.handleChange}
          />
          {formik.touched.content && formik.errors.content && (
            <p className="text-sm text-red-500">{formik.errors.content}</p>
          )}
          <button
            type="submit"
            className="bg-olive text-white px-6 py-2 rounded-lg hover:bg-gold transition"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="text-sm text-gray-600">
          <Link href="/login" className="text-olive font-medium hover:underline">
            Login
          </Link>{" "}
          to leave a comment.
        </div>
      )}
    </div>
  );
};

export default CommentSection;
