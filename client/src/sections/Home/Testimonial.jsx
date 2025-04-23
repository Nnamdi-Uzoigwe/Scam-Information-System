export default function Testimonial() {
    const testimonials = [
        {
          name: "Chioma A.",
          feedback: "This platform helped me recover from a close call. I now know what to watch for!",
        },
        {
          name: "Ibrahim M.",
          feedback: "I reported a scammer in just a few clicks. It's empowering to know I could help someone else stay safe.",
        },
        {
          name: "Adaeze K.",
          feedback: "The awareness tips opened my eyes to how tricky scammers can be. So grateful for this resource!",
        },
        {
          name: "Samuel T.",
          feedback: "I’ve been scammed before, but now I feel equipped to recognize the signs thanks to this site.",
        },
        {
          name: "Blessing O.",
          feedback: "It's comforting to know others have faced this too. The testimonials really made me feel less alone.",
        },
        {
          name: "Tunde F.",
          feedback: "I share this website with friends and family now. It's a powerful tool in fighting online scams.",
        }
      ];
      
    return (
<section className="bg-gray-50 py-16 px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
      What Our Users Are Saying
    </h2>

    {/* Top 2 Testimonials */}
    <div className="flex flex-col md:flex-row gap-6 mb-10">
      {testimonials.slice(0, 2).map((t, index) => (
        <div
          key={index}
          className={`flex-1 p-6 rounded-xl shadow-md ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
          }`}
        >
          <p className="text-gray-700 mb-4">“{t.feedback}”</p>
          <p className="font-semibold text-[#0F766E]">{t.name}</p>
        </div>
      ))}
    </div>

    {/* Bottom 3 Testimonials */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {testimonials.slice(2, 6).map((t, index) => (
        <div
          key={index}
          className={`p-5 rounded-xl shadow ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
          }`}
        >
          <p className="text-gray-700 mb-3">“{t.feedback}”</p>
          <p className="font-semibold text-[#0F766E]">{t.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>

    )
}