import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  text: ({ node }) => {
    let content: React.ReactNode = node.text

    // Apply formatting in the right order
    if (node.format & 1) content = <strong>{content}</strong> // bold
    if (node.format & 2) content = <em>{content}</em> // italic
    if (node.format & 8)
      content = (
        <span
          className="break-words hyphens-auto inline leading-tight bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(transparent 70%, hsl(var(--primary)) 70%, hsl(var(--primary) / 0.8) 90%, transparent 85%)`,
            backgroundSize: '100% 100%',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          {content}
        </span>
      ) // underline

    return content
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-3xl"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        `payload-richtext prose dark:prose-invert mb-5 prose-h3:font-tiempos 
        prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:font-light prose-h3:mb-6 prose-h3:leading-tight 
        prose-h2:text-4xl prose-h2:font-tiempos lg:prose-h2:text-6xl prose-h2:font-light prose-h2:mb-8 prose-h2:leading-tight font-work-sans`,
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
        },
        className,
      )}
      {...rest}
    />
  )
}
