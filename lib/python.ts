export async function python(strOrPath: string) {
  const command = new Deno.Command("python.exe", {
    args: [
        "-c",
        strOrPath
    ],
    stdin: "piped",
    stdout: "piped",
  });

  const process = command.spawn();

  const result = await process.output();
  console.log(new TextDecoder().decode(result.stdout));
}
