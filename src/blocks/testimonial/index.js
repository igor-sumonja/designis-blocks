import { registerBlockType, getBlockDefaultClassName } from '@wordpress/blocks';
import { RichText, MediaPlaceholder, BlockControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Toolbar, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType( 'designis/testimonial', {
  title: __('Testimonial', 'designis'),
  description: __('Testimonial', 'designis'),
  icon: 'smiley',
  category: 'layout',
  attributes: {
    id: {
      type: 'number',
      default: ''
    },
    name: {
      type: 'string',
      source: 'html',
      selector: '.wp-block-designis-testimonial__name'
    },
    text: {
      type: 'string',
      source: 'html',
      selector: '.wp-block-designis-testimonial__testimonial'
    },
    alt: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'alt',
      default: ''
    },
    url: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
    },
  },
  edit: ({ className, attributes, setAttributes }) => {

    const onSelectImage = ({ id, url, alt }) => {
      setAttributes({ id, url, alt })
    }

    const onSelectURL = url => {
      setAttributes({ url, id: null, alt: null })
    }

    const { name, text, url, alt, id } = attributes

    return (
      <>
        <BlockControls>
          { url &&
          <Toolbar>
            <MediaUploadCheck>
              <MediaUpload
                allowedTypes={['image']}
                value={id}
                render={({open}) => <Button
                  label='Edit image'
                  icon='edit'
                  onClick={ open }
                />}
                onSelect={image => onSelectImage(image)}
              />
            </MediaUploadCheck>
            <Button
              label='Remove image'
              icon='trash'
              onClick={ () => setAttributes({id: null, url: null, alt: null})}
            />
          </Toolbar>
          }
        </BlockControls>
        <div className={className}>
          <div className={`${className}__header`}>
            {
              url
                ? <img src={url} alt={alt} />
                : <MediaPlaceholder
                  icon='format-image'
                  onSelect={image => onSelectImage(image)}
                  onSelectURL={url => onSelectURL(url)}
                  onError={error => console.log(error)}
                  accept='image/*'
                  allowedTypes={['image']}
                />
            }
            <RichText
              placeholder='Person name'
              className={`${className}__name`}
              tagName='p'
              value={name}
              onChange={name => setAttributes({ name })}
            />
          </div>

          <RichText
            placeholder='Testimonial text....'
            className={`${className}__testimonial`}
            tagName='p'
            value={text}
            onChange={text => setAttributes({ text })}
          />
        </div>
      </>
    )
  },
  save: ({ attributes }) => {

    // className is not available under save function so we get it like this
    // top div will get that class name by default
    const className = getBlockDefaultClassName( 'designis/testimonial' )

    return (
      <div>
        <div className={`${className}__header`}>
          <img
            src={attributes.url}
            alt={attributes.alt}
          />
          <RichText.Content
            tagName='p'
            value={attributes.name}
            className={`${className}__name`}
          />
        </div>
        <RichText.Content
          tagName='p'
          value={attributes.text}
          className={`${className}__testimonial`}
        />
      </div>
    )
  }
} );
