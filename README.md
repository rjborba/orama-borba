# Orama Search Bar Challenge

Component was built as a React Library.
Playground page contains an example of how to use it.

Users can pass a custom collapsed version of the Widget Button. Playground has a radio button showing a default and custom button instances.

## Running

1. `pnpm install`
2. `pnpm dev`

## Known Issues / TODO

- Shortcut representation should adapt according to SO. Right now it only displays a COMMAND icon.
- Navigation to destiny is mocked. I have not built the example page.
- Widget Results navigation with arrow keys is only working with focus on Input. Ideally a global listener supposed to be used so in case of focus somewhere else it would still work. I did not spent much time on it
- Orama envs supposed to be in a meta.env file

## Suggestions to Orama Search Lib

- Seems like there is no progressive wait for new retries and lib retries right away after a failed request. Ideally some retry policy should be implement.
- There is no Loading state. It would be useful to represent that current data user is seeing is actually staled.
- I could have missed it, but it seems the Types of orama are not exported. Also, useSearch hook in my opinion should also take a generate parameter so de user can define what is the expected data.
- Partial match results would be useful so we could highlight matching therms on the result / underneath page.
