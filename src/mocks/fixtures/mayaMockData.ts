export const getContextResponse = {
  status: 1,
  message: 'success',
  data: [
    {
      title: 'Test Context 1',
      description: 'I am a forecast analyzer',
      id: '32daf57a-b05a-11ee-90a9-4ea0f9a85921',
      icon: 'icon1'
    },
    {
      title: 'Test Context 2',
      description: 'I am a forecast analyzer',
      id: '32daf57a-b05a-11ee-90a9-4ea0f9a85922',
      icon: 'icon2'
    },
    {
      title: 'Test Context 3',
      description: 'I am a forecast analyzer',
      id: '32daf57a-b05a-11ee-90a9-4ea0f9a85923',
      icon: 'icon3'
    },
    {
      title: 'Test Context 4',
      description: 'I am a forecast analyzer',
      id: '32daf57a-b05a-11ee-90a9-4ea0f9a85924',
      icon: 'icon4'
    }
  ]
};

export const chatResponse = {
  status: 1,
  message: 'success',
  data: {
    context_id: '9a736e1a-af97-11ee-93fb-ee042f0c007b',
    message_id: '9a736f46-af97-11ee-93fb-ee042f0c007b',
    seq_id: '1',
    chat: {
      role: 'assistant',
      content: 'Hello world',
      content_type: 'text',
      time: '1704877616.124304'
    }
  }
};
