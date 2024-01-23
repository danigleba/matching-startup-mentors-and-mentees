import Testimonial from "./Testimonial"

export default function Features() {
    return (
        <div id="features" className="pt-12">
            <h2 className="pb-6">Skip the guessing and learn what <a className="bg-[#52b788] text-white px-2">really</a> works</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mx-8 pt-6 md:mx-20 text-[#222222]">
                <div className="grid grid-cols-1 gap-6 h-max">
                    <Testimonial 
                        name="Jeff Bezzos"
                        title="Founder of Amazon"
                        quote="You have to have some mentors [...] These are the kinds of things that build up and allow you to jump off into uncharted terrain and do so because you know you have a support system."
                        image="/profiles/jeffbezos.jpeg"/>
                    <Testimonial 
                        name="Steve Jobs"
                        title="Co-founder of Apple"
                        quote="Mike (Markkula) really took me under his wing. His values were much aligned with mine. He emphasised that you should never start a company with the goal of getting rich. Your goal should be making something you believe in and making a company that will last."
                        image="/profiles/stevejobs.jpeg" />
                    <Testimonial 
                        name="Warren Buffet"
                        title="Founder of Buffett Foundation"
                        quote="I was lucky to have been exposed to the ideas of Ben Graham early in life"
                        image="/profiles/warrenbuffet.webp"/> 
                </div>
                <div className="grid grid-cols-1 gap-6 h-max">
                    <Testimonial 
                        name="Alex Hormozi"
                        title="Co-funder of Aquisition.com"
                        quote="A great mentor will make sure you’ll move ahead in the path, even if he gets left behind."
                        image="/profiles/alexhormozi.jpg"/>
                    <Testimonial 
                        name="Sir Richard Brandson"
                        title="Founder of Virgin Group"
                        quote="If you ask any successful businessperson, they will always have had a great mentor at some point along the road."
                        image="/profiles/richardbranson.jpeg"/>
                    <Testimonial 
                        name="Yves Saint Laurent"
                        title="Founder of YSL"
                        quote="I tried to show that fashion is art, For that, I followed the counsel of my master Christian Dior and the imperishable lesson of Mademoiselle Chanel."
                        image="/profiles/yvessaintlaurent.jpeg"/> 
                </div>
                <div className="grid grid-cols-1 gap-6 h-max">
                    <Testimonial 
                        name="Bill Gates"
                        title="Co-founder of Microsoft"
                        quote="Warren isn’t just a great friend. He is also an amazing mentor. I have been learning from him since the day we met in 1991."
                        image="/profiles/billgates.jpeg" />
                    <Testimonial 
                        name="Iman Gadzhi"
                        title="Founder of IAG Media"
                        quote="Even Alexander the Great, Aristotle and Plato needed mentors. What makes you think you don't need one?"
                        image="/profiles/imangadzhi.jpeg" />
                    <Testimonial 
                        name="Oprah Winfrey"
                        title="Founder of Harpo Productions"
                        quote="Mentorship is the key to unlocking your full potential."
                        image="/profiles/oprahwinfrey.webp"/>  
                </div>
            </div>
            <h2 id="how" className="pt-24">They already did it, <a className="bg-[#52b788] text-white px-2">now it's your turn</a></h2>
            <div className="text-center pt-6 font-medium text-xl space-y-12 md:space-y-6 mx-8 md:mx-20">
                <p>1. 📋 Complete <a className="underline text-blue-400" href="https://pqqg8ji8pbd.typeform.com/to/WKNxkfX8" target="_blank">this form</a>.</p>
                <p>2. 👩🏼‍💼 Connect with a successful entrepreneur tailored to your stage, market & experience.</p>
                <p>3. ✨ Learn from their experience & achieve your startups dreams.</p>
            </div>
        </div>
    )
}