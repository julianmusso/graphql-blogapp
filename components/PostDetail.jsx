import React from 'react'
import moment from 'moment'

const PostDetail = ({ post }) => {

    {/* INICIO DEL CODIGO COPIADO */}
    
    {/* Este pedazo de código recibe como argumento el texto en raw, es decir el texto enriquecido tal cual está. */}
    {/* El objetivo de la función es devolver fragmentos en JSX (HTML) del texto enriquecido. */}
    {/* Es decir, si en algún momento encuentra un texto con algún 'aditivo' como una itálica o algo parecido, */}
    {/* generará ese mismo contenido pero en JSX. */}

    {/* Esto funciona para traducir automáticamente el texto enriquecido, al menos desde GRAPHQL. */}

    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-three':
            return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedText;
        }
    };
    {/* FIN DEL CODIGO COPIADO */}

    console.log(post)
  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>

        {/* Imagen destacada */}
        <div className='relative overflow-hidden shadow-md mb-6'>
            <img 
                src={ post.featuredImage.url }
                alt={ post.title }
                classname='object-top h-full w-full rounded-t-lg'
            />
        </div>

        {/*  Contenido del autor y fecha de creacion */}
        <div className='px-4 lg:px-0'>
            <div className='flex items-center mb-8 w-full'>

                {/*  Datos del Autor */}
                <div className='flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                    <img alt={post.author.name}
                        height='30px'
                        width='30px'
                        className='align-middle rounded-full'
                        src={post.author.photo.url}
                    /> 
                    <p className='inline align-middle text-gray-700 ml-2 text-lg'> {post.author.name} </p>
                </div>

                {/*  Fecha del post */}
                <div className='font-medium text-gray-700'>
                    <span>
                        {moment(post.createdAt).format('MMM DD, YYYY')}
                    </span>
                </div>
            </div>

            {/*  Cuerpo del contenido completo del post */}
            <h2 className='mb-8 text-3xl font-semibold'> {post.title} </h2>
            {
                post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))

                    return getContentFragment(index, children,typeObj, typeObj.type)
                })
            }
        </div>

    </div>
  )
}

export default PostDetail