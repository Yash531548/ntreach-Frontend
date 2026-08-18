import { useState } from "react";
import { useNavigate } from "react-router";

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleFeedback = () => {
    setIsOpen(false);
    navigate("/feedback");
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition cursor-pointer hover:scale-105 hover:bg-blue-700"
        aria-label="Give feedback"
      >
        <span className="text-xl">💬</span>
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-end bg-black/30 p-4 sm:items-center sm:justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Feedback</h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-2xl leading-none text-gray-400 cursor-pointer hover:text-gray-600"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <p className="text-sm leading-6 text-gray-600">
              Thank you for visiting netreach.co.in. Your feedback helps us to
              improve our engagement with the community. This survey is
              completely voluntary, anonymous and confidential and takes a
              minute to complete.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                Maybe Later
              </button>

              <button
                type="button"
                onClick={handleFeedback}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-blue-700"
              >
                Give Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
