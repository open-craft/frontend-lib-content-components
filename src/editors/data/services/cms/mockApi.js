/* istanbul ignore file */
import * as urls from './urls';

const mockPromise = (returnValue) => new Promise(resolve => resolve(returnValue));

// TODO: update to return block data appropriate per block ID, which will equal block type
// eslint-disable-next-line
export const fetchBlockById = ({ blockId, studioEndpointUrl }) => {
  let data = {};
  if (blockId === 'html-block-id') {
    data = {
      data: '<p>Test prompt content</p>',
      display_name: 'My Text Prompt',
    };
  } else if (blockId === 'problem-block-id') {
    data = {
      data: `<problem>
      <optionresponse>
          <p>You can use this template as a guide to the simple editor markdown and OLX markup to use for dropdown problems. Edit this component to replace this template with your own assessment.</p>
          <label>Add the question text, or prompt, here. This text is required.</label>
          <description>You can add an optional tip or note related to the prompt like this. </description>
          <optioninput>
              <option correct="False">an incorrect answer</option>
              <option correct="True">the correct answer</option>
              <option correct="False">an incorrect answer</option>
          </optioninput>
      </optionresponse>
  </problem>

  `,
      display_name: 'Dropdown',
      metadata: {
        markdown: `You can use this template as a guide to the simple editor markdown and OLX markup to use for dropdown problems. Edit this component to replace this template with your own assessment.
        >>Add the question text, or prompt, here. This text is required.||You can add an optional tip or note related to the prompt like this. <<
        [[
        an incorrect answer
        (the correct answer)
        an incorrect answer
        ]]`,
      },
    };
  }
  return mockPromise({ data: { ...data } });
};

// TODO: update to return block data appropriate per block ID, which will equal block type
// eslint-disable-next-line
export const fetchByUnitId = ({ blockId, studioEndpointUrl }) => mockPromise({
  data: { ancestors: [{ id: 'unitUrl' }] },
});
// eslint-disable-next-line
export const fetchImages = ({ learningContextId, studioEndpointUrl }) => mockPromise({
  data: {
    assets: [
      {
        displayName: 'shahrukh.jpg',
        contentType: 'image/jpeg',
        dateAdded: 'Jan 05, 2022 at 17:38 UTC',
        url: '/asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
        externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
        portableUrl: '/static/shahrukh.jpg',
        thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@shahrukh.jpg',
        locked: false,
        id: 'asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
      },
      {
        displayName: 'IMG_5899.jpg',
        contentType: 'image/jpeg',
        dateAdded: 'Nov 16, 2021 at 18:55 UTC',
        url: '/asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
        externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
        portableUrl: '/static/IMG_5899.jpg',
        thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@IMG_5899.jpg',
        locked: false,
        id: 'asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
      },
      {
        displayName: 'ccexample.srt',
        contentType: 'application/octet-stream',
        dateAdded: 'Nov 01, 2021 at 15:42 UTC',
        url: '/asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
        externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
        portableUrl: '/static/ccexample.srt',
        thumbnail: null,
        locked: false,
        id: 'asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
      },
      {
        displayName: 'Tennis Ball.jpeg',
        contentType: 'image/jpeg',
        dateAdded: 'Aug 04, 2021 at 16:52 UTC',
        url: '/asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
        externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
        portableUrl: '/static/Tennis_Ball.jpeg',
        thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@Tennis_Ball-jpeg.jpg',
        locked: false,
        id: 'asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
      },
    ],
  },
});

export const normalizeContent = ({
  blockId,
  blockType,
  content,
  learningContextId,
  title,
}) => {
  let response = {};
  if (blockType === 'html') {
    response = {
      category: blockType,
      couseKey: learningContextId,
      data: content,
      has_changes: true,
      id: blockId,
      metadata: { display_name: title },
    };
  } else if (blockType === 'problem') {
    response = {
      category: blockType,
      couseKey: learningContextId,
      has_changes: true,
      id: blockId,
      metadata: { display_name: title, markdown: content },
    };
  } else {
    throw new TypeError(`No Block in V2 Editors named /"${blockType}/", Cannot Save Content.`);
  }
  return { ...response };
};

export const saveBlock = ({
  blockId,
  blockType,
  content,
  learningContextId,
  studioEndpointUrl,
  title,
}) => mockPromise({
  url: urls.block({ studioEndpointUrl, blockId }),
  content: normalizeContent({
    blockType,
    content,
    blockId,
    learningContextId,
    title,
  }),
});

export const uploadImage = ({
  learningContextId,
  studioEndpointUrl,
  // image,
}) => mockPromise({
  url: urls.courseAssets({ studioEndpointUrl, learningContextId }),
  image: {
    asset: {
      display_name: 'journey_escape.jpg',
      content_type: 'image/jpeg',
      date_added: 'Jan 05, 2022 at 21:26 UTC',
      url: '/asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg',
      external_url: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg',
      portable_url: '/static/journey_escape.jpg',
      thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@journey_escape.jpg',
      locked: false,
      id: 'asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg',
    },
    msg: 'Upload completed',
  },
});

// TODO: update to return block data appropriate per block ID, which will equal block type
// eslint-disable-next-line
export const fetchStudioView = ({ blockId, studioEndpointUrl }) => {
  let data = {};
  if (blockId === 'html-block-id') {
    data = {
      data: '<p>Test prompt content</p>',
      display_name: 'My Text Prompt',
    };
  } else if (blockId === 'problem-block-id') {
    data = {
      data: `<problem>
      <optionresponse>
          <p>You can use this template as a guide to the simple editor markdown and OLX markup to use for dropdown problems. Edit this component to replace this template with your own assessment.</p>
          <label>Add the question text, or prompt, here. This text is required.</label>
          <description>You can add an optional tip or note related to the prompt like this. </description>
          <optioninput>
              <option correct="False">an incorrect answer</option>
              <option correct="True">the correct answer</option>
              <option correct="False">an incorrect answer</option>
          </optioninput>
      </optionresponse>
  </problem>`,
      display_name: 'Dropdown',
      metadata: {
        markdown: `You can use this template as a guide to the simple editor markdown and OLX markup to use for dropdown problems. Edit this component to replace this template with your own assessment.
        >>Add the question text, or prompt, here. This text is required.||You can add an optional tip or note related to the prompt like this. <<
        [[
        an incorrect answer
        (the correct answer)
        an incorrect answer
        ]]`,
      },
    };
  }

  return mockPromise({
    data: {
      // The following is sent for 'raw' editors.
      html: blockId.includes('mockRaw') ? 'data-editor="raw"' : '',
      ...data,
    },
  });
};
