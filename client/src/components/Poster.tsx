
export default function Poster() {
  return (
    <section className=" relative">
        <section className=" bg-blue-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-screen py-6 px-2 ">
                <div className="grid gap-4">
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="img " src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt=""/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt=""/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt=""/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="img" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </section>
        {/* <section className="w-full h-screen absolute top-0 bg-opacity-70 bg-slate-400 flex justify-center items-center flex-col text-4xl text-gray-900 ">
            <Logo/>
            Image Uploader
        </section> */}
    </section>
  )
}
