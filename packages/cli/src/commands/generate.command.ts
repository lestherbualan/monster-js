import { Command } from "commander";
import { generateComponent } from "./generate/generate-component";
import { generateDirective } from "./generate/generate-directive";
import { generateGuard } from "./generate/generate-guard";
import { generateInterface } from "./generate/generate-interface";
import { generateModule } from "./generate/generate-module";
import { generatePipe } from "./generate/generate-pipe";
import { generateService } from "./generate/generate-service";

export function generateCommand(program: Command) {
    const generate = program.command("generate")
        .description("Generate MonsterJS files");

    generate.command("component <name>")
        .description("Generate a component files")
        // .option("--noTest", "Generate a component without a test.", false)
        .action(generateComponent);
    
    generate.command("module <name>")
        .description("Generate a module file")
        .action(generateModule);

    generate.command("service <name>")
        .description("Generate a service file")
        .option("--singleton", "Generate a singleton service.", false)
        .action(generateService);

    generate.command("interface <name>")
        .description("Generate an interface file")
        .action(generateInterface);

    generate.command("guard <name>")
        .description("Generate a guard file")
        .action(generateGuard);

    generate.command("directive <name>")
        .description("Generate a directive file")
        .action(generateDirective);

    generate.command("pipe <name>")
        .description("Generate a pipe file")
        .action(generatePipe);
}