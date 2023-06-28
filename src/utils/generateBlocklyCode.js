export  const generateCode = (primaryWorkspace,javascriptGenerator) => {
    var code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    console.log(code);

    const commandRegex = /(\w+)\s*\(/g;
    const valueRegex = /\((.*?)\)/g;

    const commandArray = [];
    let match;
    while ((match = commandRegex.exec(code)) !== null) {
      const command = match[1];
      const valueMatch = valueRegex.exec(match.input);
      const value = valueMatch ? valueMatch[1] : undefined;
      commandArray[command] = value;
    }
    return commandArray;
  };